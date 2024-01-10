package sql

import (
	"github.com/go-sql-driver/mysql"
	"github.com/lib/pq"
)

func IsDuplicatedError(err error) bool {
	switch e := err.(type) {
	case *mysql.MySQLError:
		return e.Number == 1062
	case *pq.Error:
		return e.Code == "23505"
	}

	return false
}
