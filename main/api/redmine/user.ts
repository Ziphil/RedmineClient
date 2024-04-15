//

import {client} from "/main/api/client";
import {Id} from "/renderer/type/common";
import {UserWithDetails} from "/renderer/type/user";


export async function fetchUser({id}: {id: Id}): Promise<UserWithDetails> {
  const response = await client.get(`/users/${id}.json`, {});
  const rawUser = response.data["user"];
  const user = createUserWithDetails(rawUser);
  return user;
}

function createUserWithDetails(rawUser: Record<string, any>): UserWithDetails {
  const user = {
    id: rawUser["id"],
    name: rawUser["lastname"] + " " + rawUser["firstname"],
    email: rawUser["mail"],
    avatarUrl: rawUser["avatarUrl"]
  } satisfies UserWithDetails;
  return user;
}