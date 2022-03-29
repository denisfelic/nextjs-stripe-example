import { fetchAPI } from "../lib/api";
export default function Page(props) {
  const article = props.article.attributes;
  const pageComponent = article.Components;

  const localComponents = {
    "shared.componente": (data, key) => <FakeLocalComponent key={key} data={data} />,
  };
  return (
    <div>
      <h2>{article.title}</h2>
      <div>
        {pageComponent &&
          pageComponent.map((component, i) => {
            return localComponents[component.__component](component, i);
          })}
      </div>
    </div>
  );
}

function FakeLocalComponent(props) {
  const {frase} = props.data
  return <div>{frase}</div>;
}

export async function getStaticProps(ctx) {
  const { page } = ctx.params
  console.log();
  const [articleRes] = await Promise.all([
    fetchAPI(`/articles/${page}`, {
      populate: ["image", "category", "Components"],
    }),
  ]);

  return {
    props: {
      article: articleRes.data,
    },
  };
}


export async function getStaticPaths() {
    return {
      paths: [
        { params: { page: '1' } },
        { params: { page: '2' } },
        { params: { page: '3' } },
        { params: { page: '4' } }
      ],
      fallback: 'blocking' // See the "fallback" section below
    };
  }
