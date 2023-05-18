import Particles from "react-particles";
import { loadFull } from "tsparticles";

function Background() {
  const particlesInit = async (main) => {
    // console.log(main);

    await loadFull(main);
  };
  const particlesLoaded = (container) => {
    // console.log(container);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        name: "NASA",
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: {
            value: 1000,
            density: {
              enable: true,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 1,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              opacity_min: 0,
              sync: false,
            },
          },
          size: {
            value: 1,
            random: true,
            animation: {
              enable: false,
              speed: 4,
              size_min: 0.3,
              sync: false,
            },
          },
          links: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 600,
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
            onClick: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            grab: {
              distance: 400,
              links: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 250,
              size: 0,
              duration: 2,
              opacity: 0,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
            remove: {
              quantity: 2,
            },
          },
        },
        background: {
          color: "#000",
          position: "50% 50%",
          repeat: "no-repeat",
          size: "20%",
        },
      }}
    />
  );
}

export default Background;
