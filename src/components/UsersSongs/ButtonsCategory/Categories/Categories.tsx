import ButtonCategory from '../../../Buttons/ButtonCategory';

type CategoriesProps = {
  selectedButton: {
    id: number;
    value: string;
  };
  setSelectedButton: (
    value: React.SetStateAction<{
      id: number;
      value: string;
    }>
  ) => void;
};

export default function Categories({
  selectedButton,
  setSelectedButton,
}: CategoriesProps) {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: '10px',
        marginBottom: '10px',
      }}
    >
      <div
        onClick={() =>
          setSelectedButton({
            id: 0,
            value: 'Todas',
          })
        }
      >
        <ButtonCategory selected={selectedButton.id === 0 ? true : false}>
          Todas
        </ButtonCategory>
      </div>
      <div
        onClick={() =>
          setSelectedButton({
            id: 1,
            value: 'Artistas',
          })
        }
      >
        <ButtonCategory selected={selectedButton.id === 1 ? true : false}>
          Artistas
        </ButtonCategory>
      </div>
      <div
        onClick={() =>
          setSelectedButton({
            id: 2,
            value: 'Géneros',
          })
        }
      >
        <ButtonCategory selected={selectedButton.id === 2 ? true : false}>
          Géneros
        </ButtonCategory>
      </div>
    </section>
  );
}
