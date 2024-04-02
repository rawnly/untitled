import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'Federico Vitale - Software Engineer'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
  // Font
  const berkeleyMono = fetch(
    new URL('../barkeley-mono-variable-regular.woff2', import.meta.url)
  ).then((res) => res.arrayBuffer())
 
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#111113',
          fontSize: 32,
          fontWeight: 600,
          gap: '1.5rem',
          padding: '48px',
          color: "#fff"
        }}
      >
        <img 
          src="https://github.com/rawnly.png" 
          alt="rawnly's profile pic" 
          width={120} 
          style={{
            borderRadius: '50%'
          }} 
        />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h1 >Federico Vitale</h1>
          <h3 style={{ fontSize: 24 }}>Software Engineer</h3>
        </div>
      </div>
    ),
    {
      ...size,
      debug: true,
      fonts: [
        {
          name: 'Berkeley Mono',
          data: await berkeleyMono,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
