import Layout from '../../components/layout';
import { getAllPostIds, getPostData, PostDataWHtml } from "@/lib/posts";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export const getStaticPaths: GetStaticPaths<{id: string}> = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ postData: PostDataWHtml }> = async ({ params }) => {
  if (!params || !params.id || Array.isArray(params.id)) {
    throw new Error('params.id is not string');
  }
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

export default function Post({ postData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
