import { TodoListPage } from "@/pages/TodoListPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: TodoListPage,
});
