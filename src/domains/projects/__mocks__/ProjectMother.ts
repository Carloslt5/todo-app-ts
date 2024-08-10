import { faker } from "@faker-js/faker";

import { API_DEFAULT_LIMIT } from "@/app/api";
import { UserMother } from "@/domains/auth/__mocks__/UserMother";

import { StateMother } from "./StatesMother";
import { Project } from "../projects.type";

const userData = UserMother.getMockUser();

export class ProjectMother {
  private static currentId = 1;

  static getRandomProject(project?: Partial<Project>) {
    const newProject = {
      id: (this.currentId++).toString(),
      title: faker.commerce.productName(),
      ownerId: userData.userId,
      ...project,
    } as Project;

    const states = StateMother.generateStates(newProject.id);
    const completeProject = { ...newProject, states };
    return completeProject;
  }

  static getRandomList(length = API_DEFAULT_LIMIT) {
    return Array.from({ length }, () => this.getRandomProject());
  }
}

export const MOCK_PROJECTS_LIST = ProjectMother.getRandomList();
