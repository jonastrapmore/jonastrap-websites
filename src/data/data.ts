import type { Project } from "../models/project";
import { RestPersistenceProvider } from "./restPersistenceProvider";

export const projectRestProvider = new RestPersistenceProvider<Project>('/data/projects.json')
