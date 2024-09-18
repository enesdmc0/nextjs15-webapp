import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define authentication pages
const isAuthPage = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/forgot-password(.*)", "/api(.*)"]);

export default clerkMiddleware((auth, req) => {
    // Protect all routes except authentication pages
    if (!isAuthPage(req)) auth().protect();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};