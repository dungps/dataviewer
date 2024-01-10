package utils

import (
	"strings"

	"github.com/spf13/cast"
	"golang.org/x/exp/constraints"
)

func IsSliceContains[T constraints.Ordered](itemSlice []T, searchItem T) bool {
	for _, val := range itemSlice {
		if val == searchItem {
			return true
		}
	}
	return false
}

func SliceJoin[T constraints.Ordered](itemSlice []T, sep string) string {
	var newSlice []string
	for _, val := range itemSlice {
		newSlice = append(newSlice, cast.ToString(val))
	}
	return strings.Join(newSlice, sep)
}
