import Input, { TextArea } from "@/components/input";
import { insert } from "@/database/feedback";
import { RedirectType, redirect } from "next/navigation";

export default function Page(props: {
  searchParams: {
    errors?: string;
    status?: "error" | "success";
  };
}) {
  const status = props.searchParams.status;
  const errors: Record<string, string> = Object.fromEntries(
    props.searchParams.errors
      ?.split("&")
      ?.map((error) => error.split("="))
      ?.map(([key, value]) => [key, value.replace(/%20/g, " ")]) ?? [],
  );

  async function onFormSubmit(data: FormData) {
    "use server";

    try {
      const payload: any = Object.fromEntries(data.entries());
      await insert(payload);
    } catch (e) {
      console.error(e);
      redirect("/?status=error", RedirectType.replace);
    }

    return redirect("/?status=success", RedirectType.replace);
  }

  return (
    <>
      <div className="pt-24 mx-auto max-w-3xl tracking-tight leading-relaxed max-lg:px-12">
        <div className="mb-4 space-y-4">
          <h1 className="text-7xl font-extrabold text-neutral-12 scroll-m-20 max-sm:text-5xl">
            Hey 👋
          </h1>
          <p className="text-neutral-11">
            Hey there! You&apos;re here because we&apos;ve had the opportunity
            to work together, and I genuinely value your perspective. This
            feedback form is all about gathering your thoughts, ideas, and
            suggestions to help me improve our collaboration. Your input is
            incredibly important in shaping our future projects and making them
            even better.
          </p>
          <p className="text-neutral-11">
            Thanks a bunch for taking the time to share your feedback &mdash; it
            means a lot!
          </p>
        </div>

        <form
          action={onFormSubmit}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div className="col-span-1 sm:col-span-3">
            <TextArea
              id="content"
              name="content"
              aria-errormessage={errors.content}
              placeholder="Working with Federico was..."
              className="py-4 min-h-[300px] sm:text-md"
              maxLength={500}
              minLength={100}
              readOnly={props.searchParams.status === "success"}
              required
            ></TextArea>
            <small className="text-red-11">{errors.content}</small>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm">
              Full Name
            </label>
            <Input
              aria-errormessage={errors.name}
              id="name"
              name="name"
              autoComplete="full-name"
              placeholder="John Doe"
              readOnly={props.searchParams.status === "success"}
              required
            />
            <small className="text-red-11">{errors.name}</small>
          </div>

          <div className="space-y-2">
            <label htmlFor="social">Twitter/Linkedin Url</label>
            <Input
              aria-errormessage={errors.social}
              id="social"
              name="social"
              type="text"
              placeholder="twitter.com/@yourhandle"
              readOnly={props.searchParams.status === "success"}
            />
            <small className="text-red-11">{errors.social}</small>
          </div>

          <div className="space-y-2">
            <label htmlFor="work_link">Link to work</label>
            <Input
              aria-errormessage={errors.work_link}
              id="work_link"
              name="work_link"
              type="url"
              placeholder="your-awesome-app.dev"
              readOnly={props.searchParams.status === "success"}
            />
            <small className="text-red-11">{errors.work_link}</small>
          </div>

          <div className="flex justify-center items-center w-full sm:col-span-3 sm:justify-end max-sm:mt-2">
            {props.searchParams.status === "success" ? (
              <p>Feedback sent. Thank you!</p>
            ) : (
              <button
                type="submit"
                className="py-2 px-4 max-sm:flex-1 hover:opacity-90 focus:ring-[black] dark:focus:ring-[white] focus:ring--6 text-sm rounded dark:bg-[white] dark:text-[#000] bg-[black] text-[white] focus:ring-1 outline-none"
              >
                Send feedback
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
