import { BigQuery } from "@google-cloud/bigquery";
import dotenv from 'dotenv'
dotenv.config()

const bigquery = new BigQuery({
  projectId: process.env.PROJECT_ID,
  
});
const dataset = bigquery.dataset(process.env.DATASET_ID);

(async () => {
  const table = await dataset.table(process.env.ACCOUNT_TABLE_ID)
  const [rows] = await table.query(`SELECT name, logined_at LIMIT 10`)

})();
