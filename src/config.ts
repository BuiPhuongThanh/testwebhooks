import { IGitActionSettings } from "./settings";

export interface RegexHeader {
  fixup: RegExp;
  type: RegExp;
  scope: RegExp;
  subject: RegExp;

  combined: RegExp;
}

export interface IConfig {
  // Format for header: <type>(<scope>): <subject>
  header: RegexHeader;

  // Body strictly has first line empty
  body: RegExp;

  // <scope> field will be compulsory
  compulsoryScope: boolean;

  // Max allowed header length
  maxHeaderLength: number;
}

export function getConfig(settings: IGitActionSettings): IConfig {
  const config = {} as IConfig;
  config.header = {} as RegexHeader;

  config.header.fixup = /(fixup! )*/;
  // config.header.type = /[a-zA-Z]+/;
  config.header.type = /^(feat|fix|remove|refactor|docs|chore|style|perf|vendor|ci|revert|build)+/;
  // config.header.scope = /\(([0-9a-zA-Z\-]+)\)/;
  config.header.scope = /\(([0-9a-zA-Z\-]+)\)\s*#(\d{4,5}): /;
  config.header.subject = /.+/; // Strictly has atleast on charater

  if (settings.compulsoryScope) {
    // config.header.combined = /^([a-zA-Z]+)(\(([0-9a-zA-Z\-]+)\))!?: (.+)$/;
    config.header.combined = /^(feat|fix|remove|refactor|docs|chore|style|perf|vendor|ci|revert|build)\(([0-9a-zA-Z\-]+)\)\s*#(\d{4,5}): (.+)$/;
  } else {
    // config.header.combined = /^([a-zA-Z]+)(\(([0-9a-zA-Z\-]+)\))?!?: (.+)$/;
    config.header.combined = /^(feat|fix|remove|refactor|docs|chore|style|perf|vendor|ci|revert|build)\(([0-9a-zA-Z\-]+)\)\s*#(\d{4,5}): (.+)$/;
  }

  config.body = /^\n(.+\s*)*/;

  config.compulsoryScope = settings.compulsoryScope;
  config.maxHeaderLength = settings.maxHeaderLength;

  return config;
}
