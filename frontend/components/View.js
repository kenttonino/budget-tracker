import { Container } from 'react-bootstrap';
import Head from 'next/head';

const View = ({ title, children }) => {
  return (
    <>
      <Head>
        <title key="title-tag">{title}</title>
        <meta key="title-meta" name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container className="mt-5 pt-4 mb-5">
        {children}
      </Container>
    </>
  );
};

export default View;
