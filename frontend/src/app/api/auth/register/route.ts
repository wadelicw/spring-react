export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    //validate email and password
    console.log({ email, password });
  } catch (error) {
    console.log({ error });
  }
}