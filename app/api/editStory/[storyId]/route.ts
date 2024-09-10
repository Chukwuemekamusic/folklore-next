import { NextResponse } from 'next/server';
import { createStorySchema } from '@/lib/zodSchemas';
import {  editStoryAction2 } from '@/actions/createService';
import { requireUser } from '@/lib/requireUser';
import { revalidatePath } from 'next/cache';


export async function PUT(req: Request, { params }: { params: { storyId: string } }) {
  const { storyId } = params;
  const authorId = new URL(req.url).searchParams.get('authorId');
  const userId = await requireUser();
  if (userId.id !== authorId) {
    return NextResponse.json({ success: false, error: 'You are not authorized to edit this story' }, { status: 403 });
  }

  const data = await req.json();
  const result = createStorySchema.safeParse(data);

  if (!result.success) {
    const zodErrors = result.error.issues.reduce((acc, issue) => {
      acc[issue.path[0]] = issue.message;
      return acc;
    }, {} as Record<string, string>); // Use Record for type safety

    return NextResponse.json({ error: zodErrors }, { status: 400 });
  }

  const actionResult = await editStoryAction2(null, data, storyId);

  if (actionResult.error) {
    return NextResponse.json({ success: false, error: actionResult.error }, { status: 400 });
  }

  revalidatePath('/dashboard');

  return NextResponse.json({ success: true, message: actionResult.message }, { status: 200 });
}