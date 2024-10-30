import { day_2015_12_01_issue_1 } from "../issues/day_2015_12_01_issue_1.js";
import { day_2015_12_01_issue_2 } from "../issues/day_2015_12_01_issue_2.js";
import { day_2015_12_02_issue_1 } from "../issues/day_2015_12_02_issue_1.js";
import { day_2015_12_02_issue_2 } from "../issues/day_2015_12_02_issue_2.js";
import { day_2015_12_03_issue_1 } from "../issues/day_2015_12_03_issue_1.js";
import { day_2015_12_03_issue_2 } from "../issues/day_2015_12_03_issue_2.js";
import { day_2015_12_04_issue_1 } from "../issues/day_2015_12_04_issue_1.js";
import { day_2015_12_04_issue_2 } from "../issues/day_2015_12_04_issue_2.js";

const issues = []
issues['day_2015_12_01_issue_1'] = day_2015_12_01_issue_1
issues['day_2015_12_01_issue_2'] = day_2015_12_01_issue_2
issues['day_2015_12_02_issue_1'] = day_2015_12_02_issue_1
issues['day_2015_12_02_issue_2'] = day_2015_12_02_issue_2
issues['day_2015_12_03_issue_1'] = day_2015_12_03_issue_1
issues['day_2015_12_03_issue_2'] = day_2015_12_03_issue_2
issues['day_2015_12_04_issue_1'] = day_2015_12_04_issue_1
issues['day_2015_12_04_issue_2'] = day_2015_12_04_issue_2

self.addEventListener('message', async event => self.postMessage(await issues[event.data]()))
