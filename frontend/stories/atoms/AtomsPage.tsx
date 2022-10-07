import Button from 'atoms/Button';
import Text from 'atoms/Text';
import Table from 'atoms/Table';

const entries = [
  ['Button', <Button text="Click me" />],
  ['Text', <Text text="Hello random text" />],
];

export default function AtomsPage() {
  return <Table width="full" indexed headers={['name', 'component']} entries={entries} />;
}
