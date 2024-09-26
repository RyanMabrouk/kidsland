"use client";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Enums } from "@/types/database.types";
import updateData from "@/api/updateData";
import getSession from "@/api/getSession";
import useTranslation from "@/translation/useTranslation";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

export default function LanguageSwitcher() {
  const [languages] = useState([
    { code: "fr", name: "FR", flag: "🇫🇷" },
    { code: "en", name: "EN", flag: "🇬🇧" },
  ] as { code: Enums<"languages_enum">; name: string; flag: string }[]);
  const { data: translation } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (newLang: Enums<"languages_enum">) => {
      const { session } = await getSession();
      if (!session) {
        throw new Error(translation?.lang["User is not authenticated"]);
      }
      await updateData({
        tableName: "profiles",
        match: { user_id: session.user.id },
        payload: { default_language: newLang },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lang"] });
      toast.success(
        translation?.lang["Language changed"] ?? "Language changed",
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const language = languages.find(
    (lang) => lang.code === translation?.default_language,
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex w-[2.5rem] flex-row items-center justify-between gap-0.5 rounded-md border border-slate-400 p-1.5 text-sm">
          <span>{language?.flag} </span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[4rem] focus:outline-none">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              mutate(lang.code);
            }}
            className="w-full min-w-max cursor-pointer justify-between p-1 text-sm"
          >
            <span className="text-lg">{lang.flag}</span>
            {language?.code === lang.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
