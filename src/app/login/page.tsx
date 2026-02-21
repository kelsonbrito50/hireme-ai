import { redirect } from "next/navigation";

/**
 * /login → redirect to landing page (which handles GitHub OAuth sign-in)
 */
export default function LoginPage() {
  redirect("/");
}
