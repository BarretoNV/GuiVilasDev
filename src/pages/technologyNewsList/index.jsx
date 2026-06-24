import NYTNewsListPage from "../../components/NYTNewsListPage";

export default function TechNewsList() {
  return (
    <NYTNewsListPage
      section="technology"
      titleKey="news.technologyTitle"
      errorKey="news.technologyError"
    />
  );
}
