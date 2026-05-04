import NYTNewsListPage from "../../components/NYTNewsListPage";

export default function NewsList() {
  return (
    <NYTNewsListPage
      section="science"
      title="Notícias científicas do"
      errorMessage="Não foi possível carregar as notícias de ciência."
    />
  );
}
