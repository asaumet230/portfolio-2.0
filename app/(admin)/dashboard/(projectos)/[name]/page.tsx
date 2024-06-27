
interface Props {
    params: { name: string };
  }
  


export default function ProjectPage({ params }:Props) {
  return (
    <div>
      <h1>{ params.name }</h1>
    </div>
  );
}