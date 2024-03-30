import { Container } from '@components/Container';
import IndexSearchBar from '@package_navigation/components/IndexSearchBar';
import TopAreaCard from '@package_navigation/components/TopAreaCard';
import ApplicationList from '@package_navigation/components/ApplicationList';

const Component = () => {
  return (
    <Container $gutter={[16, 24]}>
      <IndexSearchBar />
      <TopAreaCard />
      <ApplicationList />
    </Container>
  );
};

export default Component;
