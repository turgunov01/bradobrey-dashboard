-- Branch-scoped expenses for managers and administrators.
-- Apply this migration in the backend database before enabling the API endpoints.

CREATE TABLE IF NOT EXISTS expenses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  category text NOT NULL,
  name text NOT NULL,
  amount numeric(12, 2) NOT NULL CHECK (amount > 0),
  spent_at date NOT NULL DEFAULT CURRENT_DATE,
  comment text,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_expenses_branch_spent_at
  ON expenses (branch_id, spent_at DESC);

CREATE INDEX IF NOT EXISTS idx_expenses_branch_category
  ON expenses (branch_id, category);
