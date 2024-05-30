import {useEffect, useState} from "react";
import {TableColumn} from "../interfaces/table.ts";
import Table from "../components/table/Table.tsx";
import {Test} from "../interfaces/test.ts";
import {CourseTestsService} from "../services/course.tests.service.ts";


export default function CourseTests () {

  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const data: Test[] = await CourseTestsService.getCourseTests();
        setTests(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await CourseTestsService.deleteCourseTest(id);
      const data: Test[] = await CourseTestsService.getCourseTests();
      setTests(data);
    } catch (error) {
      setError(error as Error);
    }
  };

  const columns: TableColumn<Test>[] = [
    { key: "ID", label: "ID" },
    { key: "title", label: "Заголовок" },
    // { key: "Questions", label: "Вопросы"},
    { key: "module_id", label: "Модуль" },
    // { key: "DeletedAt", label: "Дата удаления"},
    // { key: "CreatedAt", label: "Дата создания"},
    // { key: "updatedAt", label: "Дата обновления"},

  ];

  return (
    <>
      {loading && "Loading..."}
      {error && "Error"}
      <Table onDelete={handleDelete} modelType={"tests"} data={tests} columns={columns} />
    </>
  )
}