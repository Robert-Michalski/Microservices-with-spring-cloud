package com.rob.productservice.dto;

import java.util.Map;

public record ProductRequestNew(Map<Long, Integer> productIdsToQuantity, Long customerId) {

}
