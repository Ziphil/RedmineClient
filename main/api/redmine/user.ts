//

import {client} from "/main/api/client";
import {Id} from "/renderer/type/common";
import {DetailedUser} from "/renderer/type/user";


export async function fetchUser({id}: {id: Id}): Promise<DetailedUser> {
  const response = await client.get(`/users/${id}.json`, {});
  const rawUser = response.data["user"];
  const user = createDetailedUser(rawUser);
  return user;
}

function createDetailedUser(rawUser: Record<string, any>): DetailedUser {
  const user = {
    id: rawUser["id"],
    name: rawUser["lastname"] + " " + rawUser["firstname"],
    email: rawUser["mail"],
    avatarUrl: rawUser["avatarUrl"]
  };
  return user;
}