import Link from 'next/link';

export default function Home() {
  const getRandomDuration = () => {
    const duration = Math.random() * 4 + 8; // 8.0 to 12.0
    return `${duration.toFixed(1)}s`;
  };

  return (
    <div style={{overflowX: 'hidden', overflowY: 'hidden'}}>
      <div >
        <h1 className="text-center text-6xl font-bold mb-4 mt-16">SkinSight</h1>
        <h2 className="text-center">An inclusive diagnostic tool for skin diseases</h2>
        <div className="flex flex-col items-center justify-center">
          <Link href="/upload" className="inline-block bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-6 mb-8 text-center">
            Try it out
          </Link>
        </div>
      </div>
      <div class="m1" style={{width: '100vw', marginTop: '8px'}}>
        <div class="m2" style={{animationDuration: getRandomDuration()}}>acne</div><br />
        <div class="m2" style={{animationDuration: getRandomDuration()}}>benign tumors</div><br />
        <div class="m2" style={{animationDuration: getRandomDuration()}}>eczema</div><br />
        <div class="m2" style={{animationDuration: getRandomDuration()}}>fungal infections</div><br />
        <div class="m2" style={{animationDuration: getRandomDuration()}}>malignant lesions</div><br />
        <div class="m2" style={{animationDuration: getRandomDuration()}}>nail fungus</div><br />
        <div class="m2" style={{animationDuration: getRandomDuration()}}>psoriasis</div><br />
        <div class="m2" style={{animationDuration: getRandomDuration()}}>viral infections</div>
      </div>
    </div>
  );
}
