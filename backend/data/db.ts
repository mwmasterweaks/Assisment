import { Agent } from "../models/Agent";
import { Property } from "../models/Property";
import { Tenant } from "../models/Tenant";
import { Note } from "../models/Note";

export const db = {
  agents: [] as Agent[],
  properties: [] as Property[],
  tenants: [] as Tenant[],
  notes: [] as Note[],
};