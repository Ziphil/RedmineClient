/* eslint-disable no-useless-computed-key */

import axios, {Axios} from "axios";
import applyCaseConverter from "axios-case-converter";
import {app as electronApp} from "electron";
import fs from "fs/promises";
import {join as joinPath} from "path";
import {Id} from "/renderer/type";


export class Settings {

  public client!: Axios;
  public redmineUrl: string;
  public redmineKey: string;

  public activityId: number;
  public exceptionalOffDates: Array<string>;
  public projectPriorities: Array<[Id, number]>;

  public constructor() {
    this.redmineUrl = "";
    this.redmineKey = "";
    this.activityId = 9;
    this.exceptionalOffDates = [];
    this.projectPriorities = [];
  }

  public static async load(path: string): Promise<Settings> {
    const string = await fs.readFile(path, {encoding: "utf-8"}).catch(() => "{}");
    const json = JSON.parse(string);
    const settings = new Settings();
    console.log("settings loaded", json);
    settings.redmineUrl = json.redmineUrl ?? settings.redmineUrl;
    settings.redmineKey = json.redmineKey ?? settings.redmineKey;
    settings.activityId = json.activityId ?? settings.activityId;
    settings.exceptionalOffDates = json.exceptionalOffDates ?? settings.exceptionalOffDates;
    settings.projectPriorities = json.projectPriorities ?? settings.projectPriorities;
    settings.updateClient();
    return settings;
  }

  private updateClient(): void {
    const client = axios.create({
      baseURL: this.redmineUrl,
      timeout: 10000,
      headers: {
        ["X-Redmine-API-Key"]: this.redmineKey
      }
    });
    this.client = applyCaseConverter(client);
  }

}


let settings = null as Settings | null;

export async function getSettings(): Promise<Settings> {
  if (settings === null) {
    const path = (process.env.DEVELOPPING === "true") ? "./settings.json" : joinPath(electronApp.getPath("userData"), "settings.json");
    settings = await Settings.load(path);
  }
  return settings;
}