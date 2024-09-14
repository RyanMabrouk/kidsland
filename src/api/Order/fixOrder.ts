"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import getUser from "../getUser";
import { Tables, TablesInsert } from "@/types/database.types";
import getOrderProducts from "../Order products/getOrderProducts";
import { postOrder } from "./postOrder";
import { create } from "domain";
import { createNewOrder } from "./createNewOrder";

export async function fixOrder() {

}
