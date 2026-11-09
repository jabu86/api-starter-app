import { useEffect, useState } from "react";

function CountUp({ value = 0, duration = 1500 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const target = Number(value) || 0;
        const startTime = performance.now();
        let animationFrame;

        const animate = (currentTime) => {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            setCount(Math.floor(progress * target));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [value, duration]);

    return <>{count.toLocaleString()}</>;
}

export default CountUp;