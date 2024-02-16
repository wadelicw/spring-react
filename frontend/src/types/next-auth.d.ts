import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      accessToken: string;
      role: "USER" | "ADMIN";
      sub: string;
    };
  }
}