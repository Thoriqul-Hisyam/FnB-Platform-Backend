export interface JwtPayload {
  sub: string; // biasanya ID user
  email: string;
  role?: string; // opsional, jika kamu pakai role
}
