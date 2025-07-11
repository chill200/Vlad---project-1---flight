import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div aria-live="assertive" role="alert" className="loader" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    --hue: 210;
    --size: 100px;
    --border: 10px;
    --speed: 1s;
    --blur: var(--border);
  }

  .loader {
    width: var(--border);
    aspect-ratio: 1;
    background: white;
    border-radius: 50%;
    position: absolute;
    --y: calc((var(--size) * -0.5) + (var(--border) * 0.5));
    transform: rotate(0deg) translateY(var(--y));
    animation: spin var(--speed) infinite linear;
  }

  .loader::before {
    content: '';
    position: absolute;
    inset: calc(var(--border) * -0.5);
    border-radius: 50%;
    background: white;
    filter: blur(var(--blur));
    z-index: -1;
  }

  .loader::after {
    content: '';
    width: var(--size);
    aspect-ratio: 1;
    position: absolute;
    top: 0%;
    left: 50%;
    translate: -50% 0;
    background: conic-gradient(
      white,
      hsl(var(--hue), 100%, 70%),
      hsl(var(--hue), 100%, 10%),
      transparent 65%
    );
    border-radius: 50%;
    mask: radial-gradient(
      transparent calc(((var(--size) * 0.5) - var(--border)) - 1px),
      white calc((var(--size) * 0.5) - var(--border))
    );
  }

  @keyframes spin {
    to {
      transform: rotate(-360deg) translateY(var(--y));
    }
  }
`;

export default Loader;
