import NYTNewsListPage from "../../components/NYTNewsListPage";

export default function TechNewsList() {
  return (
    <NYTNewsListPage
      section="technology"
      title="Notícias do mundo da tecnologia pelo"
      errorMessage="Não foi possível carregar as notícias de tecnologia."
    />
  );
}
