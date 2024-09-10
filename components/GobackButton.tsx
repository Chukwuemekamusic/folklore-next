'use client'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface GoBackButtonProps {   
  addText?: boolean;
  text?: string;
}

export default function GoBackButton({ addText = false, text = 'Go Back' }: GoBackButtonProps) {
  const router = useRouter();
  return (
    <Button  onClick={() => router.back()} variant="outline" className=" px-4">
      <ArrowLeft className="mr-2 size-4" /> {addText ? text : ''}
    </Button>
  );
}
