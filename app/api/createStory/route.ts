import { createStorySchema, TcreateStorySchema } from "@/lib/zodSchemas";
import { NextResponse } from "next/server";
import { createStoryAction } from "@/actions/createService";
import { revalidatePath } from "next/cache";


export async function POST(req: Request) {
  const body = await req.json();
  const result = createStorySchema.safeParse(body);

// console.log('result', result)
if (!result.success) {
    const zodErrors = result.error.issues.reduce((acc, issue) => {
      acc[issue.path[0]] = issue.message;
      return acc;
    }, {} as Record<string, string>); // Use Record for type safety

    return NextResponse.json({ error: zodErrors }, { status: 400 });
  }

  // Call the createStoryAction with the validated body
  const actionResult = await createStoryAction(null, body);

  // Check if there are errors from the action
  if (actionResult.error) {
    return NextResponse.json({ success: false, error: actionResult.error }, { status: 400 });
  }

  revalidatePath('/dashboard');
  return NextResponse.json({ success: true, message: actionResult.message }, { status: 200 });
}