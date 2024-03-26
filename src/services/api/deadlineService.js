import moment from "moment";

export class DeadlineService {
  constructor(api) {
    this.api = api;
  }

  toJSON(deadline) {
    deadline.dueDate = deadline.dueDate.toISOString();
    deadline.assignedDate = deadline.assignedDate.toISOString();
    return deadline;
  }

  fromJSON(deadline) {
    try {
      // deadline.dueDate = new Date(deadline.dueDate);
      // deadline.assignedDate = new Date(deadline.assignedDate);
      deadline.dueDate = new moment(deadline.dueDate);
      deadline.assignedDate = new moment(deadline.assignedDate);
    } catch (e) {
      console.log(e);
    }
    return deadline;
  }

  async getDeadlines() {
    const res = await this.api.get("/deadlines");
    res.data.map((d) => this.fromJSON(d));
    return res.data;
  }

  async createDeadline(deadline) {
    const res = await this.api.post("/deadlines", deadline);
    return this.fromJSON(res.data);
  }

  async updateDeadline(deadline) {
    const res = await this.api.patch(`/deadlines/${deadline._id}`, deadline);
    return this.fromJSON(res.data);
  }

  async deleteDeadline(id) {
    const res = await this.api.delete(`/deadlines/${id}`);
    return this.fromJSON(res.data);
  }
}
