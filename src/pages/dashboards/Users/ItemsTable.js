import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Table
} from "reactstrap";

const ItemsTable = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h4">Все пользователи</CardTitle>
    </CardHeader>
    <Table size="sm" striped>
      <thead>
        <tr>
          <th>Operation System</th>
          <th className="text-right">Users</th>
          <th className="text-right">Share</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Windows</td>
          <td className="text-right">8.232</td>
          <td className="text-right">40%</td>
        </tr>
        <tr>
          <td>Mac OS</td>
          <td className="text-right">3.322</td>
          <td className="text-right">20%</td>
        </tr>
        <tr>
          <td>Linux</td>
          <td className="text-right">4.232</td>
          <td className="text-right">34%</td>
        </tr>
        <tr>
          <td>FreeBSD</td>
          <td className="text-right">1.121</td>
          <td className="text-right">12%</td>
        </tr>
        <tr>
          <td>Chrome OS</td>
          <td className="text-right">1.331</td>
          <td className="text-right">15%</td>
        </tr>
        <tr>
          <td>Android</td>
          <td className="text-right">2.301</td>
          <td className="text-right">20%</td>
        </tr>
        <tr>
          <td>iOS</td>
          <td className="text-right">1.162</td>
          <td className="text-right">14%</td>
        </tr>
        <tr>
          <td>Windows Phone</td>
          <td className="text-right">562</td>
          <td className="text-right">7%</td>
        </tr>
        <tr>
          <td>Other</td>
          <td className="text-right">1.181</td>
          <td className="text-right">14%</td>
        </tr>
      </tbody>
    </Table>
  </Card>
);

export default ItemsTable