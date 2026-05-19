"use server";

import { insertEvent, updateEvent, deleteEventById } from "@/app/lib/scripts/EventPostgres";
import { Event } from "@/data/schedule/EventSchema";

export async function sendInsert(id: string, event: Event) {
  return await insertEvent(id, event);
}

export async function sendUpdate(id : string, event : Event) {
    return await updateEvent(id, event)
}

export async function sendDelete(id : string) {
    return await deleteEventById(id)
}