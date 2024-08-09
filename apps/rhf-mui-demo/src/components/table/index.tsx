import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Code } from '@/components';
import { PropDesc } from '@/types';

type TableProps = {
  rows: Array<PropDesc>;
  isLastColDesc?: boolean;
};

export function Table({ rows, isLastColDesc }: TableProps) {
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Prop</TableCell>
            <TableCell>Required</TableCell>
            <TableCell>{isLastColDesc ? 'Description' : 'Type'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell align="center">
                {row.isRequired ? <span>✅</span> : ''}
              </TableCell>
              <TableCell>
                {isLastColDesc ? (
                  row.description
                ) : (
                  <Code>{row.description}</Code>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
