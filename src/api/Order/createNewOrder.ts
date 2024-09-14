"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getUser from "../getUser";
import { Tables, TablesInsert } from "@/types/database.types";
import { postOrder } from "./postOrder";
import { ICartResponse } from "@/hooks/data/cart/cartPopulatedQuery";
import getCart from "../Cart/getCart";

export async function createNewOrder() {}
