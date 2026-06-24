import NYTNewsListPage from "../../components/NYTNewsListPage";

export default function NewsList() {
  return (
    <NYTNewsListPage
      section="science"
      titleKey="news.scienceTitle"
      errorKey="news.scienceError"
    />
  );
}
