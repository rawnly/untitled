---
title: Monorepo with Rust + Typescript (1)
summary: Share types across your stack, use the same models on backend and frontend
date: 2023-04-21
tags:
  - rust
  - typescript
  - monorepo
  - programming
---

In this series of articles we're going to build a simple todo-list app with [`Axum`][axum] and `React`, sharing models between projects and maintaining all the code in the same repo.

Let's jump into the project!

## Project Setup

Our project structure will be something like the following

```sh
- apps
	- server # Rust server
	- web # Frontend
- crates
	- models # Shared types
```

- The `apps` directory will contain our main code to run server and frontend.
- The `crates` directory will contain our rust code shared between the 2 apps
- The `packages` directory will contain the node modules shared across the apps

## Monorepo Initialization

To handle cross-project scripts and cache them we're going to use [turborepo][turborepo] + `pnpm` workspaces.

Intialize your new project via `pnpm init` and install turbo as the following:

```sh
pnpm add turbo
```

Now create a new file named `pnpm-workspace.yml` with the following content

```yaml
packages:
	- apps/*
	- crates/*
```

This will tell `pnpm` where to look for when installing new dependencies or when your run a script.

Since we're using `rust` we have to do the same for our rust projects. Create a new `Cargo.toml` as the following

```toml
[workspace]
members = [
	# Server app
	"apps/server",

	# Add all your local crates
	"crates/models"
]
```

Since we haven't created any app / crate yet your LSP could throw some errors. You can safely ignore them until we do some actual coding.

We can end this configuration part with the last config file: `turbo.json` this will tell turbo how to link dependencies between them and what to cache:

```json
{
  "pipelines": {
    "dev": {
      "dependsOn": ["^dev"],
      "outputs": []
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", "target/debug/**"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "lint": {
      "dependsOn": [],
      "outputs": []
    }
  }
}
```

`<< TODO: explain the file upthere >>`

## Frontend - Nextjs

Ok now let's get our hands a little dirty. Let's create our frontend: for the ease of process we're going to use nextjs via `create-next-app`

```sh
mkdir -p apps
pnpm create next-app ./apps/frontend
```

> NOTE: Answer **_YES_** when prompting if you want to use **Typescript**

Right now we don't need to do any further edit to this, we'll come back on the frontend in the next article once we have some API to consume.

## Backend - Rust + Axum

To setup our backend server we just need to `cd apps` and run `cargo new server` this will initialize a basic rust binary for us.

Now we have to setup the server, install the following crates:

- tokio - Async runtime for rust
- axum - HTTP Server
- serde - JSON (De)Serialization
- headers - Utility crate
- tracing - Logger
- validator - Validate request body
- clap - Handle startup parameters and configuration
- sqlx - Database library
- chrono - Datetime library

```sh
cargo add \
	clap -F clap/derive -F clap/env \
	tokio -F tokio/full \
	serde -F serde/derive \
	axum -F axum/headers \
	headers \
	validator \
	sqlx -F sqlx/runtime-tokio-native-tls -F sqlx/postgres -F sqlx/uuid -F sqlx/chrono \
	tracing \
	chrono
```

Our rust project will have the following structure:

```sh
main.rs   # run the server
lib.rs    # exports the http server
config.rs # will contain our clap configuration
http/
	- mod.rs   # the axum server itself
	- error.rs # error struct
	- routes/  # all the routes of our app

```

### Configuration File

Let's start by setting up our config file, create a new file `config.rs` and add the following

```rust
use std::{net::Ipv4Addr, str::FromStr};

/// Config given to the server
/// Includes `db url`, `port` and `server address`
#[derive(Debug, Clone, clap::Parser)]
pub struct Config {
    #[clap(long, env)]
    pub database_url: String,

    /// Server port
    #[clap(long, env, default_value_t = 8080)]
    pub port: u16,

    /// Address given to the server
    #[clap(long, env, value_parser = Ipv4Addr::from_str, default_value_t = default_address())]
    pub address: Ipv4Addr,
}

/// Provides the default server address
fn default_address() -> Ipv4Addr {
    Ipv4Addr::from_str("127.0.0.1").unwrap()
}
```

This is just because we want to be able to read configuration from environment and being able to pass config options via CLI too.

Now let's write some actual code by initializing our server under `http/mod.rs`

```rust
///! http/mod.rs

use anyhow::Context;
use std::{net::SocketAddr, sync::Arc};

use crate::config::Config;
use axum::Router;
use sqlx::PgPool;

/// Shared state between routes
// this allows us to access db and config anywhere
#[derive(Debug, Clone)]
#[allow(dead_code)]
pub struct State {
    pub db: PgPool,
    pub config: Arc<Config>,
}

/// starts the server
pub async fn serve(config: Config, db: PgPool) -> anyhow::Result<()> {
    let addr = SocketAddr::new(config.address.into(), config.port);

    // Setup the app and inject state
    let app: Router = Router::<State>::new().with_state(State {
        config: Arc::new(config.clone()),
        db,
    });

    tracing::info!(
        r#"Listening on "http://{}:{}" 🚀"#,
        config.address,
        config.port
    );

    // server startup
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .context("error running HTTP server")
}
```

One last thing to do is to call our `serve` method from the `main.rs`, to do so we have to expose our `Config` and `serve` method to the main.

Create a new file `lib.rs` as the following

```rust
// re-export mods

/// Server Configuration
pub mod config;

/// Server code
pub mod http;
```

Now in our `main.rs` intialize the database and consume the server

```rust
use clap::Parser;
use server::config::Config;
use server::http;
use sqlx::postgres::PgPoolOptions;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
	// read the config from env / stdin
    let config = Config::parse();

    // connect to the database
    let db = PgPoolOptions::new()
        .max_connections(10)
        .connect(&config.database_url)
        .await?;

    // this embeds database migration in the application binary
    // so we can ensure the db is migrated correctly on startup
    sqlx::migrate!().run(&db).await?;

    // spin up our API
    http::serve(config, db).await?;

    Ok(())
}
```

Congratulations! You have your server + database ready for receiving connections!

if you try to run `cargo run -- --help` you should see something like the following:

```sh
Config given to the server Includes `db url`, `port` and `server address`

Usage: server [OPTIONS] --database-url <DATABASE_URL>

Options:
      --database-url <DATABASE_URL>  [env: DATABASE_URL=]
      --port <PORT>                  Server port [env: PORT=] [default: 8080]
      --address <ADDRESS>            Address given to the server [env: ADDRESS=] [default: 127.0.0.1]
  -h, --help                         Print help
```

In the next article we'll explore how to create and consume an endpoint.
Make sure to subscribe to the newsletter and feel free to share or leave a comment :)

[axum]: https://github.com/tokio-rs/axum
[turborepo]: https://turbo.build
