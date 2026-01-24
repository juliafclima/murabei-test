"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { createBook } from "../actions/createBook";
import { CircleX, Save } from "lucide-react";

export default function NewBook() {
  const [state, formAction, isPending] = useActionState(createBook, null);

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push("/");
    } else if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">New Book</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" action={formAction}>
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="title">Title *</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  placeholder="Fill in the book title"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="author">Author *</FieldLabel>
                <Input
                  id="author"
                  name="author"
                  placeholder="Fill in the book author"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="author_bio">Biography</FieldLabel>
                <Input
                  id="author_bio"
                  name="author_bio"
                  placeholder="Fill in the book author biography"
                />
                <FieldDescription>
                  Short description about the author
                </FieldDescription>
              </Field>

              <div className="flex justify-end gap-2 pt-4">
                <Link href="/">
                  <Button variant="outline" disabled={isPending}>
                   <CircleX className="w-4 h-4" />  Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isPending}>
                  <Save className="w-4 h-4" />  {isPending ? "Saving..." : "Save book"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
