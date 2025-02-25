import React, { useEffect, useRef } from 'react';

const InnovatorSection = () => {
  const counterRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation(entry.target);
          } else {
            resetCounter(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const counters = document.querySelectorAll('.counter');
    counters.forEach((element) => {
      const originalText = element.textContent;
      const originalValue = parseInt(originalText.replace(/[^\d]/g, ''));
      const suffix = originalText.replace(/[\d]/g, '').trim();
      counterRefs.current[element.dataset.key] = {
        element: element,
        originalValue: originalValue,
        currentValue: 0,
        suffix: suffix
      };
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const startAnimation = (element) => {
    const key = element.dataset.key;
    const data = counterRefs.current[key];
    data.currentValue = 0; // Reset currentValue on each intersection

    const increment = data.originalValue / 100;
    const stepTime = Math.abs(Math.floor(3000 / data.originalValue));

    const animate = () => {
      if (data.currentValue < data.originalValue) {
        data.currentValue += increment;
        element.textContent = `${Math.floor(data.currentValue).toLocaleString()}${data.suffix}`;
        requestAnimationFrame(animate);
      } else {
        element.textContent = `${data.originalValue.toLocaleString()}${data.suffix}`;
      }
    };

    setTimeout(animate, stepTime);
  };

  const resetCounter = (element) => {
    const key = element.dataset.key;
    const data = counterRefs.current[key];
    data.currentValue = 0;
    element.textContent = '0';
  };

  return (
    <section className="innovatorWrap">
      <div className="container">
        <div className="titleWrap">
          <h2 className="fw700 fs40" data-aos="fade-right">A Proven Innovator in Private Equity</h2>
          <p className="fs16" data-aos="fade-left">DealAI is transforming efficiency with its pioneering NDA turner tool, streamlining a previously cumbersome and non-value-add process.</p>
        </div>
        <ul>
          <li>
            <h1 ref={(el) => {
              if (el) counterRefs.current['hoursSaved'] = { ...counterRefs.current['hoursSaved'], element: el, suffix: '+' };
            }} className="fw400 secondFonts fs80 counter" data-aos="fade-up" data-key="hoursSaved">10,000+</h1>
            <h6 className="fs18" data-aos="fade-down">Hours Saved</h6>
            <p className="fs16" data-aos="fade-down">Annually in NDA management.</p>
          </li>
          <li>
            <h1 ref={(el) => {
              if (el) counterRefs.current['fasterDeal'] = { ...counterRefs.current['fasterDeal'], element: el, suffix: '%' };
            }} className="fw400 secondFonts fs80 counter" data-aos="fade-up" data-key="fasterDeal">90%</h1>
            <h6 className="fs18" data-aos="fade-down">Faster deal initiation</h6>
            <p className="fs16" data-aos="fade-down">Reducing time to turn an NDA</p>
          </li>
          <li>
            <h1 ref={(el) => {
              if (el) counterRefs.current['moreDeals'] = { ...counterRefs.current['moreDeals'], element: el, suffix: '%' };
            }} className="fw400 secondFonts fs80 counter" data-aos="fade-up" data-key="moreDeals">6%</h1>
            <h6 className="fs18" data-aos="fade-down">More Deals</h6>
            <p className="fs16" data-aos="fade-down">Increased capacity without scaling resources</p>
          </li>
          <li>
            <h1 ref={(el) => {
              if (el) counterRefs.current['complianceErrors'] = { ...counterRefs.current['complianceErrors'], element: el, suffix: '%' };
            }} className="fw400 secondFonts fs80 counter" data-aos="fade-up" data-key="complianceErrors">99%</h1>
            <h6 className="fs18" data-aos="fade-down">Reduction in compliance errors</h6>
            <p className="fs16" data-aos="fade-down">Through automated accuracy enhancements</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default InnovatorSection;
