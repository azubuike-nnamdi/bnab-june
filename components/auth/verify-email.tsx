'use client';

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LOGIN_URL } from "@/config/routes";

export default function VerifyEmail() {

  // If token validation is successful, display success message
  return (
    <Alert variant="success">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        <p>Your email has been successfully verified. You can now log in.</p>
        <Link href={LOGIN_URL}>
          <Button>Go to Login</Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}
