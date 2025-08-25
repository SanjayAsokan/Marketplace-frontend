export default function ProjectCard({ title, description, image, glass = false, className = "" }) {
  return (
  <div 
  
  className={`rounded-lg overflow-hidden shadow-lg p-4 w-full sm:w-80 m-2 transition-transform transform hover:scale-105 
    ${glass ? 'bg-white/20 backdrop-blur-md border border-white/30 text-white' : 'bg-white text-gray-800'} 
    ${className}`}>
      
      <img src={image} alt={title} className={`h-48 w-full object-cover rounded mb-4 ${glass ? 'opacity-90' : ''}`}/>
      <h3 className={`font-bold text-lg mb-2 ${glass ? 'text-red-400' : ''}`}>{title}</h3>
      <p className={`${glass ? 'text-blue-500' : ''}`}>{description}</p>
    </div>
  );
}
