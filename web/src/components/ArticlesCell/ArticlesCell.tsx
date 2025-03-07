import type { ArticlesQuery, ArticlesQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

export const QUERY: TypedDocumentNode<
  ArticlesQuery,
  ArticlesQueryVariables
> = gql`
  query ArticlesQuery {
    articles: posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  return (
    <>
    {articles.map((article) => (
      <article key={article.id}>
          <header>
            <h2>
              <Link to={routes.article({id:article.id})}>{article.title}</Link>
            </h2>
          </header>
        <p>{article.body}</p>
        <div>Posted at: {article.createdAt}</div>
      </article>
    ))}
  </>
  )
}
