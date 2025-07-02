import Container from '../container';

const Header = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-10">
      <Container className="flex items-center justify-between py-8">
        <div>Logo</div>
      </Container>
    </nav>
  );
};

export default Header;
